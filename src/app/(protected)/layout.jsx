import ProtectedRoute from "@/components/molecules/protectedRoute";

const ProtectedLayout = ({ children }) => {
    return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default ProtectedLayout;
