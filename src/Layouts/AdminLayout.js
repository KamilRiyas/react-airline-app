import WingsNavbar from "../Components/WingsNavbar";
import { Container } from "react-bootstrap";
import { useSelector } from 'react-redux';

const AdminLayout = ({ children }) => {
    const user = useSelector((state) => state.user.value);
    console.log(user);

    return (<div>{user === 'Admin'
        ? <div><WingsNavbar menuItems={['Dashboard', 'Passengers', 'Services']} />
            <Container>{children}</Container></div>
        : <div>Unauthorized<a href='\'>Go Back</a></div>}
    </div>);
}

export default AdminLayout;