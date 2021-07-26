import WingsNavbar from "../Components/WingsNavbar";
import { Container } from "react-bootstrap";
import { useSelector } from 'react-redux';

const StaffLayout = ({ children }) => {
    const user = useSelector((state) => state.user.value);
    console.log(user);

    return (<div>{user === 'Staff'
        ? <div><WingsNavbar menuItems={['Checkin', 'Service', 'InFlight']} />
            <Container>{children}</Container></div>
        : <div>Unauthorized<a href='\'>Go Back</a></div>}
    </div>);
}

export default StaffLayout;