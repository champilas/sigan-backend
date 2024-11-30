import sequelize from "../libs/sequelize"

export const generateRandomUsername = async () => { 
    const totalUsers = await sequelize.models.User.count();
    return `user_${totalUsers + 1}`;
};

export const generateSignString = (length: number): string => {
    const characters = '0123456789';
    let sign = '';

    for (var i = 0; i < length; i++) {
        let randomPos = Math.floor(Math.random() * characters.length);
        sign += characters.charAt(randomPos);
    }

    return sign;
};