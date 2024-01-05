import React from 'react'
import { Navbar } from 'react-bootstrap';
export default function Footer() {
    let logo = 'logo.svg'

    return (
        <footer className="bg-gray-800 text-white py-12 text-center">
            <div className="container mx-auto flex justify-between items-center">
                <div className="footer-logo">
                    <Navbar.Brand href="/" className="w-52">
                        <img src="./logo.png" alt="" />
                    </Navbar.Brand>
                    {/* <h1 className="text-xl font-semibold">Your Movie Website</h1> */}
                </div>
                {/* <div className="footer-links space-x-6">
                    <a href="/" className="hover:text-blue-500">Home</a>
                    <a href="/movies" className="hover:text-blue-500">Movies</a>
                    <a href="/about" className="hover:text-blue-500">About Us</a>
                    <a href="/contact" className="hover:text-blue-500">Contact Us</a>
                </div> */}
            </div>
            <div className="footer-contact mt-6">
                <h2 className="text-lg font-semibold">Contact Us</h2>
                <p>123 Movie Street</p>
                <p>HCM,  70000</p>
                <p>Email: info@yourmoviewebsite.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
            <div className="footer-social mt-6">
                <a href="https://facebook.com" className="text-xl hover:text-blue-500 mr-4"><i className="fab fa-facebook"></i></a>
                <a href="https://twitter.com" className="text-xl hover:text-blue-500 mr-4"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" className="text-xl hover:text-blue-500"><i className="fab fa-instagram"></i></a>
            </div>
            <div className="footer-copyright mt-6 text-center">
                <p>&copy; {new Date().getFullYear()} Your Movie Website</p>
            </div>
        </footer>
    );
}