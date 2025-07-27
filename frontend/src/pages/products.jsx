import { useState, useEffect } from "react"
import axios from "axios"
import {
  Search,
  Plus,
  ShoppingCart,
  Trash2,
  Eye,
  Download,
  X,
} from "lucide-react"
import { Link } from "react-router"
const baseURL = import.meta.env.VITE_API_baseURL;


const categories = [
  "All",
  "Grains",
  "Vegetables",
  "Oil & Spices",
  "Dairy",
  "Meat",
]

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseURL}/product/all`)
        setProducts(res.data.products)
        setFilteredProducts(res.data.products)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.supplierId?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      )
    }

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products])

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id))
  }

  const getStockStatus = (qty) => {
    if (qty === 0) return { status: "Out of Stock", color: "bg-red-500" }
    if (qty < 20) return { status: "Low Stock", color: "bg-yellow-500" }
    return { status: "In Stock", color: "bg-green-500" }
  }

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

  const handleAddToCart = (product) => {
    try {
      // Adjust quantity as needed
      const quantityToAdd = 1

        axios.post(`${baseURL}/user/cart/add`, {
        productId: product._id,
        quantity: quantityToAdd
      }, {
        withCredentials: true, // if your backend uses cookies/session
      });

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add product to cart.');
    }
  }

  return (
    <>
      <nav className="bg-orange-500 text-white px-6 py-4 shadow-md mb-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">VendorMitra Admin</h1>
          <div className="flex gap-4">
            <Link to="/vdashboard" className="hover:underline">Dashboard</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
            <Link to="/orders" className="hover:underline">Orders</Link>
          </div>
        </div>
      </nav>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="border p-2 rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-orange-200">
              <th className="p-2">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const stock = getStockStatus(product.quantity)
              return (
                <tr key={product._id} className="border-t text-center">
                  <td className="p-2">
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/48"}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.supplierId?.name || "Unknown"}</td>
                  <td>₹{product.price}</td>
                  <td>{product.quantity} {product.unit}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-xs text-white rounded ${stock.color}`}
                    >
                      {stock.status}
                    </span>
                  </td>
                  <td className="flex justify-center gap-2 p-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart size={16} />
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      onClick={() => openModal(product)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
            <img
              src={selectedProduct.imageUrl || "https://via.placeholder.com/150"}
              className="w-32 h-32 object-cover mx-auto rounded"
              alt={selectedProduct.name}
            />
            <h2 className="text-xl font-bold mt-4 text-center">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              {selectedProduct.description}
            </p>
            <div className="text-sm mt-4 text-center">
              <p>Price: ₹{selectedProduct.price}</p>
              <p>
                Stock: {selectedProduct.quantity} {selectedProduct.unit}
              </p>
              <p>
                Supplier:{" "}
                {selectedProduct.supplierId?.name || "Not Available"}
              </p>
              <p className="text-orange-700 mt-1">
                Added on:{" "}
                {new Date(selectedProduct.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
