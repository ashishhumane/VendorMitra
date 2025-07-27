import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Upload, Plus, AlertCircle, CheckCircle } from "lucide-react"
import axios from "axios"


const categories = ["Grains", "Vegetables", "Oil & Spices", "Dairy", "Meat", "Fruits", "Beverages"]
const units = ["piece", "kg", "litre", "gram", "dozen", "packet", "box"]

export default function AddProductPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    unit: "piece",
    imageUrl: "",
  })



  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0"
    if (!formData.quantity || parseInt(formData.quantity) < 0)
      newErrors.quantity = "Quantity must be 0 or greater"
    // if (!formData.supplierId) newErrors.supplierId = "Supplier is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors below" })
      return
    }

    setIsSubmitting(true)
    setMessage({ type: "", text: "" })

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        createdAt: new Date(),
      }

      console.log("Product data to submit:", productData)
      setMessage({ type: "success", text: "Product added successfully!" })

      // setTimeout(() => {
      //   navigate("/admin/products")
      // }, 2000)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add product. Please try again." })
    } finally {
      setIsSubmitting(false)
    }

    if (validateForm()) {
      try {
        const res = await axios.post(
          'http://localhost:3000/product/add',
          {formData}, 
          { withCredentials: true }
        );

        console.log('Product added:', res.data);
        
      } catch (error) {
        console.error('Error adding product:', error);
      
      }
    }


  }

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      unit: "piece",
      imageUrl: "",
      supplierId: "",
    })
    setImagePreview("")
    setErrors({})
    setMessage({ type: "", text: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-50 to-pink-100 p-6">
      <header className="flex items-center justify-between py-4 border-b-4 border-orange-300 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-orange-700 hover:text-orange-800 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-orange-700 drop-shadow">Add New Product</h1>
            <p className="text-orange-600 mt-1">Add a new product to VendorMitra inventory</p>
          </div>
        </div>
      </header>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl border-2 flex items-center gap-3 ${message.type === "success"
            ? "bg-green-50 border-green-200 text-green-700"
            : "bg-red-50 border-red-200 text-red-700"
            }`}
        >
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border-2 border-orange-200">
          <div className="p-6 border-b border-orange-200">
            <h2 className="text-xl font-bold text-orange-700">Product Information</h2>
            <p className="text-orange-600 text-sm mt-1">Fill in the details below to add a new product</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-orange-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.name ? "border-red-300 focus:border-red-400" : "border-orange-200 focus:border-orange-400"
                    }`}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-orange-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none transition resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition bg-white ${errors.category
                    ? "border-red-300 focus:border-red-400"
                    : "border-orange-200 focus:border-orange-400"
                    }`}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-2">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 transition bg-white"
                />
                {formData.imageUrl && (
                  <p className="text-sm text-gray-600 mt-2 break-all">Preview: {formData.imageUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.price ? "border-red-300 focus:border-red-400" : "border-orange-200 focus:border-orange-400"
                    }`}
                />
                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.quantity
                    ? "border-red-300 focus:border-red-400"
                    : "border-orange-200 focus:border-orange-400"
                    }`}
                />
                {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-orange-700 mb-2">Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none transition bg-white"
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>


            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-orange-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Product
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none border-2 border-orange-300 text-orange-700 hover:bg-orange-100 disabled:opacity-50 font-bold py-3 px-6 rounded-lg transition"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="mt-12 text-center text-sm text-orange-700 font-semibold">
        &copy; {new Date().getFullYear()} VendorMitra Admin. Adding Khushiyon ki Guarantee!
      </footer>
    </div>
  )
}
