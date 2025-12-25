import { useState, useEffect} from "react";
import { supabase } from "./supabaseClient";
export default function App() {

    const [todos, setTodos] = useState([]);
    const [inpVal, setInpVal] = useState("");


    useEffect(() => {
        async function fetchData() {
        const { data, error } = await supabase
            .from('todos')
            .select('*');
       if (error) {
      console.log("Xato bo'ldi:", error.message);
    } else {
      setTodos(data); 
    }
}
fetchData();
}, []);

    async function addTodo() {
        const {data, error} = await supabase
        .from('todos')
        .insert([{title: inpVal, is_complete: false}])
        .select()

        if (error) {
            console.log("Xato bo'ldi:", error.message);
        } else {
            setTodos([...todos, data[0]]);
        }
    }

    async function deleteTodo(id) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id); // Faqat shu ID-ga teng bo'lgan qatorni o'chir

  if (error) {
    console.log("O'chirishda xato:", error.message);
  } else {
    // UI-ni yangilash: o'chirilgan vazifani todos massividan olib tashlaymiz
    setTodos(todos.filter(todo => todo.id !== id));
  }
}

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input type="text" placeholder="New todo" onChange={(e) => setInpVal(e.target.value)}/>
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.title}
                        <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px', color: 'red' }}>
                            O'chirish
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}