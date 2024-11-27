import User from '../models/user';

export default class UserRepository {
    getUserByName(username: string) {
        const defaultUsername = process.env.DEFAULT_USERNAME ?? '';
        const defaultPassword = process.env.DEFAULT_PASSWORD ?? '';

        if (username === defaultUsername) {
            return new User(defaultUsername, defaultPassword);
        }
    }
}