function buyCoin() {
    let balance = parseInt(document.getElementById('balance').textContent) || 0;
    balance += 50; // Add 50 coins to balance
    document.getElementById('balance').textContent = balance;
    alert("You bought 50 coins!");
}

document.getElementById('auth').style.display = 'block';
document.getElementById('dashboard').style.display = 'none';
