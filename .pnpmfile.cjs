module.exports = {
    hooks: {
        readPackage(pkg) {
            if (pkg.name === "jwks-rsa" && pkg.dependencies?.jose) {
                pkg.dependencies.jose = "^5.9.6";
            }

            return pkg;
        },
    },
};
