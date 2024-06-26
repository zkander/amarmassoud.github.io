
document.addEventListener('DOMContentLoaded', async() => {
    let users = [];

        const productsData = localStorage.getItem('products');
        if (!productsData) {
            const response = await fetch('../../data/products.json');
  
            if (response.ok) {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    localStorage.setItem('products', JSON.stringify(responseData));
                    products = responseData;
                    // console.log('products data:', users);
                } else {
                    console.error('Invalid products data format:', responseData);
                }
            } else {
                console.error('Failed to fetch products data');
            }
        } else {
            products = JSON.parse(productsData);
            console.log('products data:', products);
        }
        const commentsData = localStorage.getItem('comments');
        if (!commentsData) {
            const response = await fetch('../../data/comments.json');
  
            if (response.ok) {
                const responseData = await response.json();
                responseData.forEach((comment) => {
                    if(comment.rating===undefined){
                        comment.rating=Math.floor(Math.random() * 5) + 1;
                    }
                });
                if (Array.isArray(responseData)) {

                    localStorage.setItem('comments', JSON.stringify(responseData));
                } else {
                    console.error('Invalid products data format:', responseData);
                }
            } else {
                console.error('Failed to fetch products data');
            }
        } else {
        }


    localStorage.removeItem('currentUser');
    const getUsers = async () => {
        const usersData = localStorage.getItem('user');
        if (!usersData) {
            const response = await fetch('../../data/users.json');
            if (response.ok) {
                const responseData = await response.json();
                if (Array.isArray(responseData)) {
                    localStorage.setItem('user', JSON.stringify(responseData));
                    users = responseData;
                    console.log('Users data:', users);
                } else {
                    console.error('Invalid users data format:', responseData);
                }
            } else {
                console.error('Failed to fetch users data');
            }
        } else {
            users = JSON.parse(usersData);
            console.log('Users data:', users);
        }
    };

    await getUsers(); //

    const checkExist =(email) =>{
        if (users.find((user) => user.email === email)) {
            return true;
        }}

    const signUpForm = document.getElementById('signup-form');
    signUpForm.addEventListener('submit', (event) => {
        // window.location.href = '../seller/seller-dashboard.html';

        event.preventDefault(); // Prevent default form submission
        const name= document.getElementById('name').value;
        const role=document.getElementById('role').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const[firstName, lastName]= name.split(" ")
        const newUser = {
            id: users.length + 1,
            firstName,
            lastName,
            email,
            password,
            role: role,
            addresses: [],
            balance: 0,
        }

        if (!checkExist(email)) {
            // console.log(users)
        users.push(newUser)
        localStorage.setItem('user', JSON.stringify(users));
        console.log(newUser);
        if (newUser != null) {
            // console.log('User:', user);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            const role = document.querySelector('#role').value;
            if (role === 'CUSTOMER') {
                window.location.href = '/';
            } else if (role === 'SELLER') {
                window.location.href = '../seller-dashboard.html';
            }  if(role === 'ADMIN') {
                window.location.href = '../admin.html';
            }
            // window.location.href = '../../pages/seller/seller-dashboard.html';
        } else {
            alert('Invalid email or password');
        }
    } else {
        showToast("User already exists", 'bg-custom-red')
    }
        // if () {
            
        // } else {
        //     alert('Invalid email or password');
        // }
    });

    const showToast=(message, color)=>{
        const toastContainer = document.getElementById('toast-container');
        toastContainer.classList.remove('hidden');
        const toastAlert= document.querySelector('#toast-alert');
        toastAlert.textContent=message;
        toastAlert.classList.remove('bg-gray-100');
        toastAlert.classList.add(color);
    
        setTimeout(() => {
          toastContainer.classList.add('hidden');
        }, 3000);
    }
    

    

});