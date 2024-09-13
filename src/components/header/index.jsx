import React from "react"

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    
    return (
        <></>
    )
}

export default Header