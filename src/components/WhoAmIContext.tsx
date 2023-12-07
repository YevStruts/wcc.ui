import {createContext} from 'react'
import { Constants } from '../helpers/ConstantHelper';

export interface WhoAmI
{
    username: string,
    role: string
};

export const WhoAmIContext = createContext<WhoAmI>({ role: Constants.Roles.User, username: "Anonymous" });
