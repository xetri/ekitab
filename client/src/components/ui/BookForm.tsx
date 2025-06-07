import { Book } from "@lib/types";
import { useState } from "react";

interface BookFormProps {
  onSubmit: (newBook : Book) => void;
  publisherId: string;
  initialData?: {
    title?: string;
    price?: number;
    categories?: string[];
  };
}

export default function BookForm({ onSubmit, publisherId, initialData }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    price: initialData?.price?.toString() || "",
    categories: (initialData?.categories || []).join(", "),
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBook: Book = {
      id: "",
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      categories: formData.categories.split(",").map((cat) => cat.trim()),
      coverFile,
      pdfFile,
      publisherId,
    };

    onSubmit(newBook);
    setFormData({ title: "", price: "", categories: "" });
    setCoverFile(null);
    setPdfFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border border-gray-200 rounded-xl p-6 bg-white shadow-sm max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800">📚 Upload a Book</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Book title"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price (NPR)</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="999"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Cover Image File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full text-sm"
        />
        {coverFile && (
          <p className="text-sm text-gray-600 mt-1">Selected: {coverFile.name}</p>
        )}
      </div>

      {/* PDF File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          required={true}
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          className="mt-1 block w-full text-sm"
        />
        {pdfFile && (
          <p className="text-sm text-gray-600 mt-1">Selected: {pdfFile.name}</p>
        )}
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
        <input
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          required
          placeholder="React, TypeScript, Frontend"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-primary text-white text-sm font-medium py-2 rounded-lg hover:bg-[#FFA94D] transition"
        >
          Upload Book
        </button>
      </div>
    </form>
  );
}