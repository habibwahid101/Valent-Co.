import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  ArrowLeft, 
  Check, 
  X, 
  Eye, 
  Printer, 
  DollarSign,
  Filter
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product, Order, OrderStatus, ProductCategory, ProductVariant } from '../../types';
import { CATEGORIES_LIST, BRANDS_LIST } from '../../data/mockData';

export const AdminView: React.FC = () => {
  const { 
    products, 
    orders, 
    updateOrderStatus, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateStock, 
    resetToDemoData, 
    navigateTo, 
    formatBDT 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'categories'>('dashboard');
  
  // Orders Filter state
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [editingAdminNote, setEditingAdminNote] = useState('');

  // Products Filter state
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [productSearch, setProductSearch] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('Maison Aurelle');
  const [formCategory, setFormCategory] = useState<ProductCategory>('perfumes');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState<number>(6500);
  const [formOldPrice, setFormOldPrice] = useState<number>(0);
  const [formStock, setFormStock] = useState<number>(15);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsNew, setFormIsNew] = useState(true);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [productFormError, setProductFormError] = useState('');

  // Dashboard calculations
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const newOrdersCount = orders.filter(o => o.status === 'New').length;
  const confirmedOrdersCount = orders.filter(o => o.status === 'Confirmed' || o.status === 'Processing').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;
  const cancelledOrdersCount = orders.filter(o => o.status === 'Cancelled').length;

  const lowStockProducts = products.filter(p => p.stock <= 5);

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.mobile.includes(q) ||
        o.customer.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    }
    return true;
  });

  // Save new product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) return;
    setProductFormError('');
    setIsSavingProduct(true);

    const defaultImg = formImageUrl.trim() || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop';
    const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const sku = `VA-${formCategory.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newProdData: Omit<Product, 'id'> = {
      sku,
      name: formName.trim(),
      slug,
      brand: formBrand,
      category: formCategory,
      subtitle: formSubtitle.trim() || 'Handcrafted luxury lifestyle piece',
      description: formDesc.trim() || 'Exquisite craftsmanship crafted for discerning individuals.',
      story: 'Artisanal precision crafted with the finest European and Japanese materials.',
      price: Number(formPrice),
      oldPrice: formOldPrice > 0 ? Number(formOldPrice) : undefined,
      stock: Number(formStock),
      images: [defaultImg],
      variants: [
        {
          id: `v-${Date.now()}-1`,
          name: formCategory === 'perfumes' ? '100ml Extrait' : 'Standard Edition',
          sku: `${sku}-1`,
          price: Number(formPrice),
          stock: Number(formStock),
          inStock: Number(formStock) > 0
        }
      ],
      rating: 5.0,
      reviewCount: 1,
      isNew: formIsNew,
      isBestSeller: formIsBestSeller,
      tags: ['Luxury', formCategory]
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, newProdData);
        setEditingProduct(null);
      } else {
        await addProduct(newProdData);
      }

      // Only reset and close the modal once the save is confirmed —
      // otherwise a failed save would look identical to a successful one
      // and the product would silently be missing from the catalogue.
      setIsAddProductModalOpen(false);
      setFormName('');
      setFormSubtitle('');
      setFormDesc('');
      setFormPrice(6500);
      setFormOldPrice(0);
      setFormStock(15);
      setFormImageUrl('');
    } catch (err) {
      setProductFormError(
        err instanceof Error ? err.message : 'Could not save this product. Please try again.'
      );
    } finally {
      setIsSavingProduct(false);
    }
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormBrand(prod.brand);
    setFormCategory(prod.category);
    setFormSubtitle(prod.subtitle);
    setFormDesc(prod.description);
    setFormPrice(prod.price);
    setFormOldPrice(prod.oldPrice || 0);
    setFormStock(prod.stock);
    setFormImageUrl(prod.images[0] || '');
    setFormIsNew(!!prod.isNew);
    setFormIsBestSeller(!!prod.isBestSeller);
    setIsAddProductModalOpen(true);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      
      {/* Top Admin Header */}
      <div className="bg-[#1C1B19] text-white px-4 sm:px-8 py-4 border-b border-[#2D2B28]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#FAF9F6] transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </button>
            <div className="border-l border-white/20 pl-3">
              <h1 className="font-serif text-lg font-bold tracking-wider uppercase text-white">
                VALENT & CO. • Executive Management
              </h1>
              <span className="text-[10px] text-[#A8A49C] tracking-widest uppercase">
                Dhaka Hub Operations & Catalogue Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset catalogue and orders to initial demo state?')) {
                  resetToDemoData();
                }
              }}
              className="text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-rose-900/40 text-rose-300 border border-rose-800/40 transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Subnav */}
      <div className="bg-white border-b border-[#E8E5DE] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex gap-6 text-xs uppercase tracking-wider font-semibold">
          {[
            { id: 'dashboard', label: 'Dashboard & Metrics', icon: LayoutDashboard },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'categories', label: 'Brands & Houses', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'dashboard' | 'orders' | 'products' | 'categories')}
                className={`py-4 border-b-2 flex items-center gap-2 transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#1C1B19] text-[#1C1B19] font-bold'
                    : 'border-transparent text-[#6B6864] hover:text-[#1C1B19]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* -------------------------------------------------------------
            TAB 1: DASHBOARD
           ------------------------------------------------------------- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="p-6 bg-white rounded-xl border border-[#E8E5DE] shadow-2xs">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A6A3A] block">
                  Total Order Revenue
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B19] mt-1">
                  {formatBDT(totalRevenue)}
                </h3>
                <span className="text-[11px] text-[#6B6864] mt-2 block">
                  From {orders.length} total orders
                </span>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#E8E5DE] shadow-2xs">
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700 block">
                  Pending Verification
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B19] mt-1">
                  {newOrdersCount} New Orders
                </h3>
                <span className="text-[11px] text-[#6B6864] mt-2 block">
                  Requires phone confirmation
                </span>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#E8E5DE] shadow-2xs">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#25633C] block">
                  Confirmed & In Transit
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B19] mt-1">
                  {confirmedOrdersCount}
                </h3>
                <span className="text-[11px] text-[#6B6864] mt-2 block">
                  Dispatched via Steadfast/Pathao
                </span>
              </div>

              <div className="p-6 bg-white rounded-xl border border-[#E8E5DE] shadow-2xs">
                <span className="text-[10px] uppercase tracking-wider font-bold text-rose-700 block">
                  Inventory Alerts
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B19] mt-1">
                  {lowStockProducts.length} Low Stock
                </h3>
                <span className="text-[11px] text-[#6B6864] mt-2 block">
                  ≤ 5 units remaining
                </span>
              </div>

            </div>

            {/* Low Stock Warning Strip */}
            {lowStockProducts.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Low Inventory Warning (Refill Required at Dhaka Hub)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {lowStockProducts.map(p => (
                    <div key={p.id} className="p-2.5 bg-white rounded border border-amber-200 flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-[#1C1B19] truncate">{p.name}</strong>
                        <span className="text-[10px] text-[#6B6864]">{p.brand}</span>
                      </div>
                      <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                        {p.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders Overview */}
            <div className="bg-white rounded-xl border border-[#E8E5DE] overflow-hidden">
              <div className="p-5 border-b border-[#E8E5DE] flex justify-between items-center">
                <h3 className="font-serif text-lg font-bold text-[#1C1B19]">
                  Recent Customer Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#9A6A3A] font-semibold hover:underline cursor-pointer"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] text-[#6B6864] uppercase tracking-wider text-[10px] border-b border-[#E8E5DE]">
                    <tr>
                      <th className="p-3.5">Order</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Total</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E5DE]">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-3.5 font-mono font-bold text-[#1C1B19]">{o.orderNumber}</td>
                        <td className="p-3.5">
                          <div className="font-semibold text-[#1C1B19]">{o.customer.fullName}</div>
                          <div className="text-[11px] text-[#6B6864]">{o.customer.mobile}</div>
                        </td>
                        <td className="p-3.5 text-[#4A4744]">{o.customer.district}</td>
                        <td className="p-3.5 text-[#6B6864]">{o.items.length} pieces</td>
                        <td className="p-3.5 font-bold text-[#1C1B19]">{formatBDT(o.total)}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            o.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                            o.status === 'New' ? 'bg-amber-100 text-amber-800' :
                            o.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: ORDERS MANAGEMENT
           ------------------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E8E5DE] flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8C8880] absolute left-3 top-3" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order #, Customer, Phone..."
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#D9D5CC] bg-[#FAF9F6] focus:outline-none focus:border-[#1C1B19]"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap gap-1.5 text-xs w-full sm:w-auto">
                {['all', 'New', 'Contacted', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer capitalize ${
                      orderStatusFilter === st
                        ? 'bg-[#1C1B19] text-white font-bold'
                        : 'bg-[#F4F2EB] text-[#4A4744] hover:bg-[#E8E5DE]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-[#E8E5DE] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] text-[#6B6864] uppercase tracking-wider text-[10px] border-b border-[#E8E5DE]">
                    <tr>
                      <th className="p-4">Order Ref</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Address & Area</th>
                      <th className="p-4">Products</th>
                      <th className="p-4">Total (COD)</th>
                      <th className="p-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E5DE]">
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-4">
                          <span className="font-mono font-bold text-[#1C1B19] block">{order.orderNumber}</span>
                          <span className="text-[10px] text-[#8C8880]">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        <td className="p-4">
                          <strong className="block text-[#1C1B19]">{order.customer.fullName}</strong>
                          <a href={`tel:${order.customer.mobile}`} className="text-[#9A6A3A] font-semibold hover:underline block">
                            📞 {order.customer.mobile}
                          </a>
                        </td>

                        <td className="p-4 max-w-xs">
                          <span className="font-medium text-[#1C1B19] block">{order.customer.district} ({order.customer.thanaArea})</span>
                          <span className="text-[11px] text-[#6B6864] line-clamp-2">{order.customer.fullAddress}</span>
                        </td>

                        <td className="p-4">
                          <div className="space-y-1">
                            {order.items.map((item, i) => (
                              <div key={i} className="text-[11px] text-[#1C1B19]">
                                • {item.productName} ({item.variantName}) × {item.quantity}
                              </div>
                            ))}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="text-sm font-bold text-[#1C1B19] block">{formatBDT(order.total)}</span>
                          <span className="text-[10px] text-[#25633C] font-semibold">Cash on Delivery</span>
                        </td>

                        <td className="p-4">
                          <div className="space-y-2">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                              className="text-xs p-1.5 rounded border border-[#D9D5CC] bg-white font-semibold text-[#1C1B19] focus:outline-none focus:border-[#1C1B19] cursor-pointer"
                            >
                              <option value="New">🟡 New</option>
                              <option value="Contacted">📞 Contacted</option>
                              <option value="Confirmed">🟢 Confirmed</option>
                              <option value="Processing">📦 Processing</option>
                              <option value="Shipped">🚚 Shipped</option>
                              <option value="Delivered">✅ Delivered</option>
                              <option value="Cancelled">🔴 Cancelled</option>
                            </select>

                            <button
                              onClick={() => {
                                setSelectedOrderForModal(order);
                                setEditingAdminNote(order.adminNotes || '');
                              }}
                              className="text-[11px] text-[#9A6A3A] hover:underline block cursor-pointer"
                            >
                              View Packing Details & Notes
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: PRODUCTS MANAGEMENT
           ------------------------------------------------------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-xl border border-[#E8E5DE] flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#8C8880] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products by title, SKU..."
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#D9D5CC] bg-[#FAF9F6] focus:outline-none focus:border-[#1C1B19]"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="text-xs p-2 rounded-lg border border-[#D9D5CC] bg-[#FAF9F6] text-[#1C1B19] cursor-pointer"
                >
                  <option value="all">All Departments</option>
                  {CATEGORIES_LIST.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setFormName('');
                  setFormSubtitle('');
                  setFormDesc('');
                  setFormPrice(6500);
                  setFormOldPrice(0);
                  setFormStock(15);
                  setFormImageUrl('');
                  setIsAddProductModalOpen(true);
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl border border-[#E8E5DE] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] text-[#6B6864] uppercase tracking-wider text-[10px] border-b border-[#E8E5DE]">
                    <tr>
                      <th className="p-4">Piece</th>
                      <th className="p-4">Department</th>
                      <th className="p-4">House</th>
                      <th className="p-4">Price (BDT)</th>
                      <th className="p-4">Stock In Hub</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E5DE]">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-[#FAF9F6] transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-12 h-14 object-cover rounded bg-[#F4F2EB] border border-[#E8E5DE]"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <strong className="block text-[#1C1B19]">{product.name}</strong>
                              <span className="text-[10px] text-[#8C8880] font-mono">{product.sku}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 capitalize text-[#4A4744] font-medium">{product.category}</td>
                        <td className="p-4 text-[#9A6A3A] font-semibold">{product.brand}</td>
                        
                        <td className="p-4">
                          <span className="font-bold text-[#1C1B19]">{formatBDT(product.price)}</span>
                          {product.oldPrice && (
                            <span className="text-[10px] text-[#8C8880] line-through block">{formatBDT(product.oldPrice)}</span>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={0}
                              value={product.stock}
                              onChange={(e) => updateStock(product.id, Number(e.target.value))}
                              className="w-16 p-1 text-center rounded border border-[#D9D5CC] text-xs font-bold"
                            />
                            {product.stock <= 5 && (
                              <span className="text-[10px] text-rose-600 font-bold">Low</span>
                            )}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {product.isNew && <span className="px-1.5 py-0.5 bg-black text-white text-[9px] rounded">New</span>}
                            {product.isBestSeller && <span className="px-1.5 py-0.5 bg-[#9A6A3A] text-white text-[9px] rounded">Best</span>}
                          </div>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(product)}
                              className="p-1.5 text-[#6B6864] hover:text-[#1C1B19] hover:bg-[#E8E5DE] rounded transition cursor-pointer"
                              title="Edit product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete "${product.name}"?`)) {
                                  deleteProduct(product.id);
                                }
                              }}
                              className="p-1.5 text-[#9A9790] hover:text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: CATEGORIES & BRANDS OVERVIEW
           ------------------------------------------------------------- */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            
            {/* Departments list */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E5DE] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1C1B19]">Active Departments</h3>
              <div className="space-y-2">
                {CATEGORIES_LIST.map(cat => {
                  const count = products.filter(p => cat.id === 'all' ? true : p.category === cat.id).length;
                  return (
                    <div key={cat.id} className="p-3 bg-[#FAF9F6] rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-[#1C1B19]">{cat.name}</strong>
                        <span className="text-[10px] text-[#8C8880]">{cat.tag || 'All categories'}</span>
                      </div>
                      <span className="font-bold text-[#9A6A3A] bg-white px-3 py-1 rounded border border-[#E8E5DE]">
                        {count} items
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brands list */}
            <div className="bg-white p-6 rounded-xl border border-[#E8E5DE] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#1C1B19]">Atelier Houses & Origins</h3>
              <div className="space-y-2">
                {BRANDS_LIST.map(brand => {
                  const count = products.filter(p => p.brand === brand.name).length;
                  return (
                    <div key={brand.name} className="p-3 bg-[#FAF9F6] rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <strong className="block text-[#1C1B19]">{brand.name}</strong>
                        <span className="text-[10px] text-[#8C8880]">{brand.origin} • {brand.focus}</span>
                      </div>
                      <span className="font-bold text-[#9A6A3A] bg-white px-3 py-1 rounded border border-[#E8E5DE]">
                        {count} pieces
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* -------------------------------------------------------------
          Modal 1: Order Details & Packing Slip
         ------------------------------------------------------------- */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            onClick={() => setSelectedOrderForModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-[#E8E5DE]">
              
              <div className="flex justify-between items-start border-b border-[#E8E5DE] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A6A3A]">
                    Order Packing Slip & Notes
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#1C1B19]">
                    {selectedOrderForModal.orderNumber}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrderForModal(null)}
                  className="p-1.5 text-[#6B6864] hover:text-[#1C1B19] rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer & Address Details */}
              <div className="bg-[#FAF9F6] p-4 rounded-lg space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#8C8880] block font-semibold uppercase text-[10px]">Customer:</span>
                    <strong className="text-[#1C1B19] text-sm">{selectedOrderForModal.customer.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-[#8C8880] block font-semibold uppercase text-[10px]">Contact Mobile:</span>
                    <strong className="text-[#1C1B19] text-sm">{selectedOrderForModal.customer.mobile}</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E8E5DE]">
                  <span className="text-[#8C8880] block font-semibold uppercase text-[10px]">Delivery Destination:</span>
                  <p className="text-[#1C1B19] leading-relaxed">
                    {selectedOrderForModal.customer.fullAddress}, {selectedOrderForModal.customer.thanaArea}, {selectedOrderForModal.customer.district}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-[#1C1B19]">Items to Pack:</h4>
                <div className="divide-y divide-[#E8E5DE] border border-[#E8E5DE] rounded-lg overflow-hidden">
                  {selectedOrderForModal.items.map((it, i) => (
                    <div key={i} className="p-3 flex justify-between items-center bg-white">
                      <div>
                        <strong className="text-[#1C1B19] block">{it.productName}</strong>
                        <span className="text-[#6B6864]">{it.variantName} × {it.quantity}</span>
                      </div>
                      <span className="font-bold text-[#1C1B19]">{formatBDT(it.totalPrice)}</span>
                    </div>
                  ))}
                  <div className="p-3 bg-[#FAF9F6] flex justify-between font-bold text-[#1C1B19]">
                    <span>Total Cash to Collect:</span>
                    <span>{formatBDT(selectedOrderForModal.total)}</span>
                  </div>
                </div>
              </div>

              {/* Internal Dispatch Note */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B19]">
                  Internal Admin / Courier Tracking Note:
                </label>
                <textarea
                  rows={2}
                  value={editingAdminNote}
                  onChange={(e) => setEditingAdminNote(e.target.value)}
                  placeholder="e.g. Verified by phone call with customer. Courier tracking code: STEAD-94820"
                  className="w-full text-xs p-3 rounded-lg border border-[#D9D5CC] bg-[#FAF9F6] focus:outline-none focus:border-[#1C1B19]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    updateOrderStatus(selectedOrderForModal.id, selectedOrderForModal.status, editingAdminNote);
                    setSelectedOrderForModal(null);
                  }}
                  className="px-6 py-2.5 bg-[#1C1B19] hover:bg-[#2A2927] text-white text-xs font-bold uppercase tracking-wider rounded transition cursor-pointer"
                >
                  Save Dispatch Notes
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Modal 2: Add / Edit Product
         ------------------------------------------------------------- */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            onClick={() => setIsAddProductModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 border border-[#E8E5DE]">
              
              <div className="flex justify-between items-center border-b border-[#E8E5DE] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#1C1B19]">
                  {editingProduct ? 'Edit Creation' : 'Add New Product to Atelier'}
                </h3>
                <button
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="p-1.5 text-[#6B6864] hover:text-[#1C1B19] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {productFormError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                  {productFormError}
                </div>
              )}

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Santal Extrait No. 09"
                    className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                      Department
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                    >
                      <option value="perfumes">Perfumes</option>
                      <option value="watches">Watches</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="wallets">Wallets</option>
                      <option value="bags">Bags</option>
                      <option value="caps">Caps</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                      House / Brand
                    </label>
                    <select
                      value={formBrand}
                      onChange={(e) => setFormBrand(e.target.value)}
                      className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                    >
                      {BRANDS_LIST.map(b => (
                        <option key={b.name} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                      Price (৳) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                      Old Price (৳)
                    </label>
                    <input
                      type="number"
                      value={formOldPrice}
                      onChange={(e) => setFormOldPrice(Number(e.target.value))}
                      className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={formStock}
                      onChange={(e) => setFormStock(Number(e.target.value))}
                      className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                    Subtitle / Olfactory / Movement Summary
                  </label>
                  <input
                    type="text"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    placeholder="e.g. Mysore Sandalwood & Bourbon Vanilla"
                    className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#1C1B19] mb-1">
                    Image URL (High-Res)
                  </label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded border border-[#D9D5CC] bg-[#FAF9F6]"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="checkbox"
                      checked={formIsNew}
                      onChange={(e) => setFormIsNew(e.target.checked)}
                      className="accent-[#1C1B19]"
                    />
                    <span>Mark as New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="checkbox"
                      checked={formIsBestSeller}
                      onChange={(e) => setFormIsBestSeller(e.target.checked)}
                      className="accent-[#1C1B19]"
                    />
                    <span>Mark as Best Seller</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-[#E8E5DE] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 border border-[#D9D5CC] rounded hover:bg-[#FAF9F6] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProduct}
                    className="px-6 py-2 bg-[#1C1B19] text-white font-bold uppercase tracking-wider rounded hover:bg-[#2A2927] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSavingProduct ? 'Saving…' : editingProduct ? 'Update Product' : 'Save & Publish'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
