import React, { useState, useEffect } from 'react';
import { Calculator, Package, TrendingUp, DollarSign, Calendar, ArrowRight, Save, History, Plus, Minus } from 'lucide-react';

// Dados do Json
const initialSalesData = [
  { vendedor: "João Silva", valor: 1200.50 },
  { vendedor: "João Silva", valor: 950.75 },
  { vendedor: "João Silva", valor: 1800.00 },
  { vendedor: "João Silva", valor: 1400.30 },
  { vendedor: "João Silva", valor: 1100.90 },
  { vendedor: "João Silva", valor: 1550.00 },
  { vendedor: "João Silva", valor: 1700.80 },
  { vendedor: "João Silva", valor: 250.30 },
  { vendedor: "João Silva", valor: 480.75 },
  { vendedor: "João Silva", valor: 320.40 },
  { vendedor: "Maria Souza", valor: 2100.40 },
  { vendedor: "Maria Souza", valor: 1350.60 },
  { vendedor: "Maria Souza", valor: 950.20 },
  { vendedor: "Maria Souza", valor: 1600.75 },
  { vendedor: "Maria Souza", valor: 1750.00 },
  { vendedor: "Maria Souza", valor: 1450.90 },
  { vendedor: "Maria Souza", valor: 400.50 },
  { vendedor: "Maria Souza", valor: 180.20 },
  { vendedor: "Maria Souza", valor: 90.75 },
  { vendedor: "Carlos Oliveira", valor: 800.50 },
  { vendedor: "Carlos Oliveira", valor: 1200.00 },
  { vendedor: "Carlos Oliveira", valor: 1950.30 },
  { vendedor: "Carlos Oliveira", valor: 1750.80 },
  { vendedor: "Carlos Oliveira", valor: 1300.60 },
  { vendedor: "Carlos Oliveira", valor: 300.40 },
  { vendedor: "Carlos Oliveira", valor: 500.00 },
  { vendedor: "Carlos Oliveira", valor: 125.75 },
  { vendedor: "Ana Lima", valor: 1000.00 },
  { vendedor: "Ana Lima", valor: 1100.50 },
  { vendedor: "Ana Lima", valor: 1250.75 },
  { vendedor: "Ana Lima", valor: 1400.20 },
  { vendedor: "Ana Lima", valor: 1550.90 },
  { vendedor: "Ana Lima", valor: 1650.00 },
  { vendedor: "Ana Lima", valor: 75.30 },
  { vendedor: "Ana Lima", valor: 420.90 },
  { vendedor: "Ana Lima", valor: 315.40 }
];

const initialStockData = [
  { codigoProduto: 101, descricaoProduto: "Caneta Azul", estoque: 150 },
  { codigoProduto: 102, descricaoProduto: "Caderno Universitário", estoque: 75 },
  { codigoProduto: 103, descricaoProduto: "Borracha Branca", estoque: 200 },
  { codigoProduto: 104, descricaoProduto: "Lápis Preto HB", estoque: 320 },
  { codigoProduto: 105, descricaoProduto: "Marcador de Texto Amarelo", estoque: 90 }
];

// Componentes

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors ${
      active 
        ? 'bg-red-600 text-white shadow-lg' 
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

const SalesTab = () => {
  const [processedSales, setProcessedSales] = useState([]);

  useEffect(() => {
    // Regra de Negócio: Comissão
    const results = initialSalesData.map((sale, index) => {
      let comissaoPercentual = 0;
      let comissaoValor = 0;

      if (sale.valor < 100) {
        comissaoPercentual = 0;
      } else if (sale.valor < 500) {
        comissaoPercentual = 1;
      } else {
        comissaoPercentual = 5;
      }

      comissaoValor = (sale.valor * comissaoPercentual) / 100;

      return { ...sale, id: index, comissaoPercentual, comissaoValor };
    });
    setProcessedSales(results);
  }, []);

  const totalComissao = processedSales.reduce((acc, curr) => acc + curr.comissaoValor, 0);

  return (
    <section className="space-y-6 animate-fadeIn" aria-label="Painel de Vendas">
      <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <header className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <TrendingUp className="mr-2 text-red-600" aria-hidden="true" /> 
            Relatório de Comissões
          </h2>
        </header>

        {/* Métricas como Lista de Itens */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <li className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm text-blue-600 font-semibold mb-1">Total de Vendas</h3>
            <p className="text-2xl font-bold text-blue-900">
              {processedSales.length}
            </p>
          </li>
          <li className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm text-green-600 font-semibold mb-1">Total Comissionado</h3>
            <p className="text-2xl font-bold text-green-900">
              R$ {totalComissao.toFixed(2).replace('.', ',')}
            </p>
          </li>
        </ul>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <caption className="sr-only">Tabela detalhada de comissões por vendedor</caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Vendedor</th>
                <th scope="col" className="px-6 py-3">Valor Venda</th>
                <th scope="col" className="px-6 py-3">% Comissão</th>
                <th scope="col" className="px-6 py-3">Valor Comissão</th>
              </tr>
            </thead>
            <tbody>
              {processedSales.map((sale) => (
                <tr key={sale.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {sale.vendedor}
                  </th>
                  <td className="px-6 py-4">R$ {sale.valor.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      sale.comissaoPercentual === 5 ? 'bg-green-100 text-green-800' :
                      sale.comissaoPercentual === 1 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {sale.comissaoPercentual}%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-700">
                    R$ {sale.comissaoValor.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

const StockTab = () => {
  const [products, setProducts] = useState(initialStockData);
  const [movements, setMovements] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(101);
  const [qty, setQty] = useState(10);
  const [desc, setDesc] = useState("Entrada de nota fiscal");
  const [type, setType] = useState('IN'); // IN or OUT

  const handleMovement = () => {
    if (!qty || qty <= 0) return alert("Quantidade inválida");

    const newProducts = products.map(p => {
      if (p.codigoProduto === parseInt(selectedProduct)) {
        const change = type === 'IN' ? parseInt(qty) : -parseInt(qty);
        return { ...p, estoque: p.estoque + change };
      }
      return p;
    });

    const newMovement = {
      id: Date.now(),
      produtoId: selectedProduct,
      tipo: type,
      quantidade: qty,
      descricao: desc,
      data: new Date().toLocaleTimeString()
    };

    setProducts(newProducts);
    setMovements([newMovement, ...movements]);
  };

  return (
    <section className="space-y-6" aria-label="Gerenciamento de Estoque">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controle */}
        <section 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          aria-labelledby="stock-control-title"
        >
          <h2 id="stock-control-title" className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Package className="mr-2 text-red-600" aria-hidden="true" /> 
            Movimentação de Estoque
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-1">
                Produto
              </label>
              <select 
                id="product-select"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                {products.map(p => (
                  <option key={p.codigoProduto} value={p.codigoProduto}>
                    {p.descricaoProduto} (Atual: {p.estoque})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div role="group" aria-label="Tipo de movimentação">
                <span className="block text-sm font-medium text-gray-700 mb-1">Tipo</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setType('IN')}
                    aria-pressed={type === 'IN'}
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center space-x-1 ${type === 'IN' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <Plus size={16} aria-hidden="true" /> <span>Entrada</span>
                  </button>
                  <button 
                    onClick={() => setType('OUT')}
                    aria-pressed={type === 'OUT'}
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center space-x-1 ${type === 'OUT' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-100 text-gray-500'}`}
                  >
                    <Minus size={16} aria-hidden="true" /> <span>Saída</span>
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="qty-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input 
                  id="qty-input"
                  type="number" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="desc-input" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição / Motivo
              </label>
              <input 
                id="desc-input"
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <button 
              onClick={handleMovement}
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition font-medium flex items-center justify-center"
            >
              <Save size={18} className="mr-2" aria-hidden="true" /> 
              Registrar Movimento
            </button>
          </div>
        </section>

        {/* Lista Atual */}
        <section 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          aria-labelledby="current-stock-title"
        >
           <h2 id="current-stock-title" className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <History className="mr-2 text-gray-600" aria-hidden="true" /> 
            Estoque Atual
          </h2>
          <ul className="space-y-2">
            {products.map(p => (
              <li key={p.codigoProduto} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <div className="font-semibold text-gray-800">{p.descricaoProduto}</div>
                  <div className="text-xs text-gray-500">Cód: {p.codigoProduto}</div>
                </div>
                <div className="text-xl font-bold text-gray-800" aria-label={`${p.estoque} unidades`}>
                  {p.estoque}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Histórico */}
      {movements.length > 0 && (
        <section 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          aria-labelledby="history-title"
        >
          <h3 id="history-title" className="font-bold text-gray-700 mb-3">
            Histórico de Movimentações (Sessão Atual)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Registro detalhado de entradas e saídas</caption>
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-2">ID</th>
                  <th scope="col" className="px-4 py-2">Tipo</th>
                  <th scope="col" className="px-4 py-2">Prod ID</th>
                  <th scope="col" className="px-4 py-2">Qtd</th>
                  <th scope="col" className="px-4 py-2">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {movements.map(m => (
                  <tr key={m.id} className="border-b">
                    <th scope="row" className="px-4 py-2 font-mono text-xs font-normal text-gray-500">
                      {m.id}
                    </th>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${m.tipo === 'IN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {m.tipo === 'IN' ? 'Entrada' : 'Saída'}
                      </span>
                    </td>
                    <td className="px-4 py-2">{m.produtoId}</td>
                    <td className="px-4 py-2">{m.quantidade}</td>
                    <td className="px-4 py-2">{m.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
};

const InterestTab = () => {
  const [value, setValue] = useState(1000);
  const [dueDate, setDueDate] = useState('2023-01-01');
  const [today] = useState(new Date());
  const [result, setResult] = useState(null);

  const calculateInterest = () => {
    const due = new Date(dueDate);
    const timeDiff = today.getTime() - due.getTime();
    const daysOverdue = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysOverdue <= 0) {
      setResult({ days: 0, interest: 0, total: parseFloat(value) });
      return;
    }

    // Regra: 2.5% ao dia
    const dailyRate = 0.025;
    const interestTotal = parseFloat(value) * dailyRate * daysOverdue;
    
    setResult({
      days: daysOverdue,
      interest: interestTotal,
      total: parseFloat(value) + interestTotal
    });
  };

  return (
    <section 
      className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100"
      aria-labelledby="calculator-title"
    >
      <h2 id="calculator-title" className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <DollarSign className="mr-2 text-red-600" aria-hidden="true" /> 
        Calculadora de Juros (2.5% a.d.)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="value-input" className="block text-sm font-medium text-gray-700 mb-1">
            Valor Original (R$)
          </label>
          <input
            id="value-input"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Vencimento
          </label>
          <input
            id="date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-100">
        <p className="flex items-center text-sm text-yellow-800">
          <Calendar className="mr-2" size={16} aria-hidden="true"/>
          <span>Data Base de Cálculo (Hoje): <strong>{today.toLocaleDateString('pt-BR')}</strong></span>
        </p>
      </div>

      <button 
        onClick={calculateInterest}
        className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition font-bold flex items-center justify-center"
      >
        Calcular Juros <ArrowRight className="ml-2" size={18} aria-hidden="true" />
      </button>

      {/* Área de Resultados com aria-live para anunciar mudanças */}
      <div aria-live="polite" className="mt-8">
        {result && (
          <section className="pt-6 border-t border-gray-100 animate-fadeIn" aria-label="Resultados do cálculo">
            <dl className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <dt className="text-xs text-gray-500 uppercase tracking-wide">Dias Atraso</dt>
                <dd className="text-xl font-bold text-gray-800">{result.days} dias</dd>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                 <dt className="text-xs text-red-500 uppercase tracking-wide">Juros</dt>
                <dd className="text-xl font-bold text-red-600">+ R$ {result.interest.toFixed(2)}</dd>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                 <dt className="text-xs text-green-500 uppercase tracking-wide">Total a Pagar</dt>
                <dd className="text-xl font-bold text-green-700">R$ {result.total.toFixed(2)}</dd>
              </div>
            </dl>
          </section>
        )}
      </div>
    </section>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('vendas');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-gray-900 text-white pb-24 pt-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Desafio Target Sistemas</h1>
          <p className="text-gray-400">Implementação de Lógica de Negócios e Controle de Estoque</p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-16">
        <nav aria-label="Abas de navegação principal">
          <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200 flex overflow-x-auto">
            <TabButton 
              active={activeTab === 'vendas'} 
              onClick={() => setActiveTab('vendas')} 
              icon={TrendingUp} 
              label="1. Vendas & Comissões" 
            />
            <TabButton 
              active={activeTab === 'estoque'} 
              onClick={() => setActiveTab('estoque')} 
              icon={Package} 
              label="2. Controle de Estoque" 
            />
            <TabButton 
              active={activeTab === 'juros'} 
              onClick={() => setActiveTab('juros')} 
              icon={DollarSign} 
              label="3. Cálculo de Juros" 
            />
          </div>
        </nav>

        <div className="py-8">
          {activeTab === 'vendas' && <SalesTab />}
          {activeTab === 'estoque' && <StockTab />}
          {activeTab === 'juros' && <InterestTab />}
        </div>
        
        <footer className="text-center text-gray-400 text-sm py-4">
          Desenvolvido como parte do teste técnico
        </footer>
      </main>
    </div>
  );
}