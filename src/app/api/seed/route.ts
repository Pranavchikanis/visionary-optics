import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Create Admin User
    const adminExists = await User.findOne({ email: "admin@visionary.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Admin User",
        email: "admin@visionary.com",
        password: hashedPassword,
        role: "admin"
      });
    }

    // 2. Create Categories
    const categoriesData = [
      { name: "Frames", slug: "frames", description: "Everyday prescription frames" },
      { name: "Sunglasses", slug: "sunglasses", description: "UV protected sunglasses" },
      { name: "Lenses", slug: "lenses", description: "Contact lenses and solutions" }
    ];
    
    await Category.deleteMany({});
    const insertedCategories = await Category.insertMany(categoriesData);

    const framesId = insertedCategories.find((c: any) => c.slug === "frames")?._id;
    const sunglassesId = insertedCategories.find((c: any) => c.slug === "sunglasses")?._id;

    // 3. Create Products
    const productsData = [
      {
        title: "Ray-Ban Aviator Classic",
        slug: "ray-ban-aviator-classic",
        description: "Currently one of the most iconic sunglass models in the world, Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937.",
        price: 8500,
        compareAtPrice: 9500,
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800"],
        category: sunglassesId,
        stock: 50,
        featured: true
      },
      {
        title: "Wayfarer Classic Frames",
        slug: "wayfarer-classic-frames",
        description: "A timeless classic that looks great on everyone. Perfect for everyday wear.",
        price: 4500,
        images: ["https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800"],
        category: framesId,
        stock: 30,
        featured: true
      },
      {
        title: "Retro Round Metal",
        slug: "retro-round-metal",
        description: "The Round Metal sunglasses are totally retro. This look has been worn by legendary musicians.",
        price: 7200,
        compareAtPrice: 8000,
        images: ["https://images.unsplash.com/photo-1508296695146-257a814050b4?w=800"],
        category: sunglassesId,
        stock: 15,
        featured: false
      },
      {
        title: "Minimalist Clear Frames",
        slug: "minimalist-clear-frames",
        description: "Trendy clear frames that blend seamlessly with any outfit.",
        price: 3500,
        images: ["https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800"],
        category: framesId,
        stock: 100,
        featured: true
      },
      {
        title: "Clubmaster Classic",
        slug: "clubmaster-classic",
        description: "Retro and timeless. Inspired by the 50s, the unmistakable design of the Clubmaster Classic.",
        price: 9000,
        images: ["https://images.unsplash.com/photo-1473496169904-658ba259837a?w=800"],
        category: sunglassesId,
        stock: 25,
        featured: false
      },
      {
        title: "Blue Light Blocking Glasses",
        slug: "blue-light-blocking",
        description: "Protect your eyes during long screen sessions with our premium blue light blocking lenses.",
        price: 2500,
        compareAtPrice: 3500,
        images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"],
        category: framesId,
        stock: 200,
        featured: true
      },
      {
        title: "Sport Polarized Sunglasses",
        slug: "sport-polarized",
        description: "Built for performance and protection during high-intensity outdoor activities.",
        price: 5500,
        images: ["https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800"],
        category: sunglassesId,
        stock: 40,
        featured: false
      },
      {
        title: "Gold Rimless Frames",
        slug: "gold-rimless-frames",
        description: "Elegant and professional rimless titanium frames in gold finish.",
        price: 6000,
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800"],
        category: framesId,
        stock: 10,
        featured: false
      },
      {
        title: "Tortoise Shell Cat Eye",
        slug: "tortoise-shell-cat-eye",
        description: "Bold and beautiful cat eye frames featuring a classic tortoise shell pattern.",
        price: 4800,
        compareAtPrice: 5500,
        images: ["https://images.unsplash.com/photo-1625591340244-b035ddb4e339?w=800"],
        category: framesId,
        stock: 45,
        featured: true
      },
      {
        title: "Oversized Square Sunglasses",
        slug: "oversized-square",
        description: "Make a statement with these dramatic, oversized square shades.",
        price: 5200,
        images: ["https://images.unsplash.com/photo-1614713568297-f5dc798836ce?w=800"],
        category: sunglassesId,
        stock: 60,
        featured: false
      }
    ];

    await Product.deleteMany({});
    await Product.insertMany(productsData);

    return NextResponse.json({ message: "Database seeded successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
