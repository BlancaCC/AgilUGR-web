var url = 'http://localhost:8000/'  

const fetchUsers = () => {
axios.get(url)
.then(response => {
    const users = response.data;
    console.log(`GET list users`, users);
})
.catch(error => console.error(error));
};

fetchUsers();