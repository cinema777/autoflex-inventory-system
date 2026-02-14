import React, { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [materials, setMaterials] = useState([]);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProd, setSelectedProd] = useState('');
  const [selectedMat, setSelectedMat] = useState('');
  const [reqQty, setReqQty] = useState('');

  const [matName, setMatName] = useState('');
  const [matQty, setMatQty] = useState('');
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  

  const linkMaterial = async () => {
    await api.post(`/products/${selectedProd}/materials/${selectedMat}?requiredQuantity=${reqQty}`);
    setReqQty('');
    loadData();
  };

  const loadData = async () => {
    try {
      const m = await api.get('/materials');
      setMaterials(Array.isArray(m.data) ? m.data : []);
      
      const p = await api.get('/products');
      setProducts(Array.isArray(p.data) ? p.data : []);
      
      const s = await api.get('/production-suggestion');
      setSuggestions(Array.isArray(s.data) ? s.data : []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setMaterials([]);
    }
  };

  useEffect(() => { loadData(); }, []);

  const addMaterial = async () => {
    await api.post('/materials', { name: matName, stockQuantity: parseFloat(matQty) });
    setMatName(''); setMatQty('');
    loadData();
  };

  const addProduct = async () => {
    await api.post('/products', { name: prodName, price: parseFloat(prodPrice) });
    setProdName(''); setProdPrice('');
    loadData();
  };

  const deleteMaterial = async (id) => {
    await api.delete(`/materials/${id}`);
    loadData();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadData();
  };

return (
  <div className="dashboard-container">
    <h1>🏭 Manufacturing Control Center</h1>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      
      {/* Coluna Esquerda: Cadastros */}
      <div>
        <div className="card">
          <h2>📦 Raw Materials</h2>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
            <input placeholder="Name" value={matName} onChange={e => setMatName(e.target.value)} />
            <input placeholder="Stock" type="number" value={matQty} onChange={e => setMatQty(e.target.value)} />
            <button onClick={addMaterial}>Add</button>
          </div>
          <table>
            <thead><tr><th>Name</th><th>Stock</th><th>Action</th></tr></thead>
            <tbody>
              {materials.map(m => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.stockQuantity}</td>
                  <td><button onClick={() => deleteMaterial(m.id)} style={{background: '#ef4444', padding: '5px 10px'}}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>💎 Registered Products</h2>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
            <input placeholder="Product" value={prodName} onChange={e => setProdName(e.target.value)} />
            <input placeholder="Price" type="number" value={prodPrice} onChange={e => setProdPrice(e.target.value)} />
            <button onClick={addProduct}>Create</button>
          </div>
          <table>
            <thead><tr><th>Product</th><th>Price</th><th>Action</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>R$ {p.price.toFixed(2)}</td>
                  <td><button onClick={() => deleteProduct(p.id)} style={{background: '#ef4444', padding: '5px 10px'}}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {}
      <div>
        <div className="card" style={{ borderColor: 'var(--primary)' }}>
          <h2>🔗 Recipe Builder (Link)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <select value={selectedProd} onChange={e => setSelectedProd(e.target.value)}>
              <option value="">Select Product</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select value={selectedMat} onChange={e => setSelectedMat(e.target.value)}>
              <option value="">Select Material</option>
              {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <input placeholder="Qty per unit" type="number" value={reqQty} onChange={e => setReqQty(e.target.value)} />
            <button style={{ background: '#0f172a' }} onClick={linkMaterial}>Link Material</button>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #059669', background: '#f0fdf4' }}>
          <h2 style={{ color: '#059669' }}>🚀 Production Strategy</h2>
          {suggestions.length === 0 ? (
            <p style={{ fontSize: '14px', color: '#666' }}>Waiting for recipes and stock data...</p>
          ) : (
            suggestions.map((s, i) => (
              <div key={i} style={{ padding: '12px', background: 'white', borderRadius: '8px', marginBottom: '10px', border: '1px solid #dcfce7' }}>
                {/* Forçamos a cor preta/escura aqui para o nome aparecer */}
                <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '16px' }}>
                  {s.productName || s.name || "Produto Sem Nome"}
                </div>
                <div style={{ fontSize: '13px', color: '#059669', marginTop: '5px' }}>
                  Can produce: <strong>{s.quantityToProduce} units</strong> | Potential: <strong>R$ {s.totalPrice.toFixed(2)}</strong>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);
} 

export default App;
