import ProtectedRoute from "@/components/molecules/protectedRoute";
import NavigationPanel from "@/components/organism/navigationPanel";

const ProtectedLayout = ({ children }) => {
    return (
        <ProtectedRoute>
            <NavigationPanel>{children}</NavigationPanel>
        </ProtectedRoute>
    );
};

export default ProtectedLayout;
