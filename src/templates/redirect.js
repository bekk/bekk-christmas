import { useNavigate } from '@reach/router';
import { useEffect } from 'react';

const RedirectTemplate = ({ pageContext }) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(pageContext.redirectTo, { replace: true });
    }, [navigate, pageContext.redirectTo]);
    return null;
};
export default RedirectTemplate;
