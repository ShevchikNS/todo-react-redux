import InputTodoComponent from "../components/InputTodo-component";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


const privateRoutes = [
    {path: '/', element: <InputTodoComponent/>, exact: true},
    {path: '/signin', element: <SignIn/>, exact: true},
    {path: '/signup', element: <SignUp/>, exact: true}
]
const publicRoutes = [
    {path: '/signin', element: <SignIn/>, exact: true},
    {path: '/signup', element: <SignUp/>, exact: true}
]
export  {privateRoutes, publicRoutes}

