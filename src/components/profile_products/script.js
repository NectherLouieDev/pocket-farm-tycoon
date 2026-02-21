
    
        const params = new URLSearchParams(window.location.search);
        const farmer = params.get("farmer");

        if (farmer) {
            const formattedName = farmer.replace(/([A-Z])/g, ' $1').trim();
            document.getElementById("farmerName").textContent = formattedName;
        }
    
