import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

const getTodos = () => {
    return axios.get(API_URL, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    });
};

const createTodo = (title, description) => {
    return axios.post(
        API_URL, { title, description},
        {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
    );
};

const toggleTodo = (id, completed) => {
    return axios.patch(
        `${API_URL}/${id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
    );
};

const deleteTodo = (id) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    });
};

export { getTodos, createTodo, toggleTodo, deleteTodo};