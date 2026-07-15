import AuthProtectedLayout from "@/components/molecules/authProjectedLayout";

const AuthLayout = ({ children }) => {
    return <AuthProtectedLayout>{children}</AuthProtectedLayout>;
};

export default AuthLayout;
