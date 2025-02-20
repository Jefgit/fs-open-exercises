import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import { UserProvider } from './UserContext'
import { NotificationProvider } from './NotificationContext'

const queryClient = new QueryClient()
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
        <QueryClientProvider client = {queryClient}>
            <UserProvider>
                <NotificationProvider>
                    <Router>
                        <App />
                    </Router>
                </NotificationProvider> 
            </UserProvider>
        </QueryClientProvider>
    </Provider>
)