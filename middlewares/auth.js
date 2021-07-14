import catchAsyncErrors from './catchAsyncErrors'
import  ErrorHandler  from '../utils/errorHandler'
import { getSession } from 'next-auth/client'

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    
    const session = await getSession({ req })

    // console.log(session);

    if (!session) {
        return next(new ErrorHandler('Login to access this source', 401));
    }

    // bai 55: current user log in: neu co session chung to da login nen lay session.user va luu user do vao req.user
    req.user = session.user;
    next();
})

export {
    isAuthenticatedUser
}