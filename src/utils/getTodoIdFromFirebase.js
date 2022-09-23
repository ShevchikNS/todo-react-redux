import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";


const editTodoFunc = async (todoId) => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    let editId = ""
    querySnapshot.forEach((doc) => {
            if (`${doc.data().todoId}` === `${todoId}`) {
                editId = doc.id
            }
        }
    );
    return editId
}

export {editTodoFunc}