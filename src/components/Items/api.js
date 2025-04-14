import { get, post, put, del } from "aws-amplify/api";

const apiName = "apif46cadde"; // Replace this with your actual API name

export const getTodos = async () => {
    try {
        const response = await get({ apiName, path: "/items" }).response;
        const data = await response.body.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
};

export const createTodo = async (item) => {
    try {
        const response = await post({
            apiName,
            path: "/items",
            options: {
                body: item,
                headers: { "Content-Type": "application/json" },
            },
        }).response;
        const data = await response.body.json();
        return data;
    } catch (error) {
        console.error("Error creating todo:", error);
        return null;
    }
};

export const updateTodo = async (id, item) => {
    try {
        const response = await put({
            apiName,
            path: `/items/${id}`,
            options: {
                body: item,
                headers: { "Content-Type": "application/json" },
            },
        }).response;
        const data = await response.body.json();
        return data;
    } catch (error) {
        console.error("Error updating todo:", error);
        return null;
    }
};

export const deleteTodo = async (id) => {
    try {
        await del({
            apiName,
            path: `/items/${id}`,
            options: {
                headers: { "Content-Type": "application/json" },
            },
        }).response;
        return true;
    } catch (error) {
        console.error("Error deleting todo:", error);
        return false;
    }
};
