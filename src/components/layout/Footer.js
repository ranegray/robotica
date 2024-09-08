import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
      <div className="container mx-auto">
        <p>&copy; 2024 - Robotica</p>
        <p>
          <Link href="/about">About Us</Link>
        </p>
      </div>
    </footer>
  );
}
