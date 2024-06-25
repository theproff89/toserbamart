document.addEventListener('DOMContentLoaded', function() {
    // Get the search input field and the search button
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('button[type="submit"]');

    // Add event listener to the search button
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        const searchTerm = searchInput.value.trim().toLowerCase();
        filterProducts(searchTerm);
    });

    // Add event listener to the search input field
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            filterProducts(searchTerm);
        }
    });

    // Function to filter products based on the search term
    function filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-item');
        products.forEach(product => {
            const productName = product.querySelector('.product-name').textContent.trim().toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'table-row';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Function to update the total price
    window.updateTotal = function() {
        let subtotal = 0;
        const products = document.getElementById('product-list').children;

        for (let i = 0; i < products.length; i++) {
            const price = parseFloat(products[i].querySelector('.price').textContent);
            const quantity = parseInt(products[i].querySelector('.quantity').value);
            subtotal += price * quantity;
        }

        const tax = subtotal * 0.1;
        const discount = parseFloat(document.getElementById('discount-amount').textContent);
        const total = subtotal + tax - discount;
        const shippingCost = parseFloat(document.getElementById('shipping-cost').textContent);
        const finalTotal = total + shippingCost;

        document.getElementById('subtotal-price').textContent = subtotal.toFixed(2);
        document.getElementById('tax-amount').textContent = tax.toFixed(2);
        document.getElementById('total-price').textContent = total.toFixed(2);
        document.getElementById('final-total').textContent = finalTotal.toFixed(2);
    };

    // Function to apply discount
    window.applyDiscount = function() {
        const discountCode = document.getElementById('discount-code').value;
        let discount = 0;

        if (discountCode === 'PROMO10') {
            discount = 10000;
        } else if (discountCode === 'PROMO20') {
            discount = 20000;
        }

        document.getElementById('discount-amount').textContent = discount.toFixed(2);
        updateTotal();
    };

    // Function to rate product
    window.rateProduct = function(productId) {
        const rating = prompt('Rate this product (1-5)');
        if (rating) {
            document.getElementById('rating-' + productId).textContent = rating + '/5';
        }
    };

    // Function to show payment instructions
    window.showPaymentInstructions = function(method) {
        let instructions = '';
        switch (method) {
            case 'ATM BCA':
                instructions = `
                    <h3>Cara Pembayaran via ATM BCA</h3>
                    <ol>
                        <li>Masukkan kartu ATM BCA Anda</li>
                        <li>Masukkan PIN Anda</li>
                        <li>Pilih menu "Transaksi Lainnya"</li>
                        <li>Pilih "Transfer" dan kemudian "Ke Rekening BCA Virtual Account"</li>
                        <li>Masukkan nomor Virtual Account yang telah diberikan</li>
                        <li>Masukkan jumlah pembayaran dan ikuti instruksi selanjutnya</li>
                    </ol>`;
                break;
            case 'DANA':
                instructions = `
                    <h3>Cara Pembayaran via DANA</h3>
                    <ol>
                        <li>Buka aplikasi DANA di smartphone Anda</li>
                        <li>Pilih menu "Scan QR Code"</li>
                        <li>Scan QR Code yang diberikan di halaman checkout</li>
                        <li>Masukkan jumlah pembayaran</li>
                        <li>Konfirmasi pembayaran dan ikuti instruksi selanjutnya</li>
                    </ol>`;
                break;
            case 'GoPay':
                instructions = `
                    <h3>Cara Pembayaran via GoPay</h3>
                    <ol>
                        <li>Buka aplikasi Gojek di smartphone Anda</li>
                        <li>Pilih menu "Bayar"</li>
                        <li>Scan QR Code yang diberikan di halaman checkout</li>
                        <li>Masukkan jumlah pembayaran</li>
                        <li>Konfirmasi pembayaran dan ikuti instruksi selanjutnya</li>
                    </ol>`;
                break;
            case 'OVO':
                instructions = `
                    <h3>Cara Pembayaran via OVO</h3>
                    <ol>
                        <li>Buka aplikasi OVO di smartphone Anda</li>
                        <li>Pilih menu "Scan"</li>
                        <li>Scan QR Code yang diberikan di halaman checkout</li>
                        <li>Masukkan jumlah pembayaran</li>
                        <li>Konfirmasi pembayaran dan ikuti instruksi selanjutnya</li>
                    </ol>`;
                break;
            default:
                instructions = '<p>Metode pembayaran tidak valid.</p>';
        }
        document.getElementById('payment-instructions').innerHTML = instructions;
    };

    // Function to show invoice
    function showInvoice() {
        const products = document.getElementById('product-list').children;
        let invoiceDetails = '<table class="table">';
        invoiceDetails += `
            <tr>
                <th>Nama Barang</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total</th>
            </tr>`;

        for (let i = 0; i < products.length; i++) {
            const name = products[i].querySelector('.product-name').textContent;
            const price = parseFloat(products[i].querySelector('.price').textContent);
            const quantity = parseInt(products[i].querySelector('.quantity').value);
            const total = price * quantity;
            if (quantity > 0) {
                invoiceDetails += `
                    <tr>
                        <td>${name}</td>
                        <td>${price}</td>
                        <td>${quantity}</td>
                        <td>${total.toFixed(2)}</td>
                    </tr>`;
            }
        }

        const finalTotal = document.getElementById('final-total').textContent;
        invoiceDetails += `
            <tr>
                <td colspan="3"><strong>Total</strong></td>
                <td><strong>${finalTotal}</strong></td>
            </tr>
        </table>`;

        document.getElementById('invoice-details').innerHTML = invoiceDetails;
    }

    // Handle pay now button click
    document.getElementById('pay-now-btn').addEventListener('click', function() {
        document.querySelector('.payment-method-section').classList.remove('d-none');
    });

    // Handle confirm payment button click
    document.getElementById('confirm-payment-btn').addEventListener('click', function() {
        showInvoice();
        $('#invoiceModal').modal('show');
    });
});
