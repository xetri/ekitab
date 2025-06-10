import { Book } from "@lib/types";
import { useState } from "react";

interface BookFormProps {
  onSubmit: (newBook : Book, coverImage: File, bookFile: File) => void;
  initialData?: {
    title?: string;
    description?: string;
    author?: string;
    categories?: string[];
  };
  isEditing: boolean;
}

export default function BookForm({ onSubmit, initialData, isEditing }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    author: initialData?.author || "",
    categories: (initialData?.categories || []).join(", "),
  });
  const [editingBook, setEditingBook] = useState(false);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBook = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      description: formData.description.trim(),
      categories: formData.categories.split(",").map((cat) => cat.trim()),
    };

    onSubmit(newBook as Book, coverFile as File, pdfFile as File);
    setFormData({ title: "", description: "", categories: "", author: "" });
    setCoverFile(null);
    setPdfFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 border border-gray-200 rounded-xl p-6 bg-white shadow-sm max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800">📚 {isEditing ? "Edit Book" : "Upload a Book"}</h2>

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

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          placeholder="Author name"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the book"
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {!isEditing && <>
      {/* Cover Image File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Cover Image</label>
        <input
          type="file"
          accept="image/jpg,image/jpeg"
          required={true}
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
      </>}

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Categories (comma separated)</label>
        <input
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="Motivation, Self Help, Philosophy"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-primary text-white text-sm font-medium py-2 rounded-lg hover:bg-[#FFA94D] transition"
        >
          {
            isEditing ? "Update" : "Upload"
          }
        </button>
      </div>
    </form>
  );
}