
import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
    
export class CustomErrorHandler implements ErrorHandler {

    handleError(error) {
        // your custom error handling logic    
    }
}