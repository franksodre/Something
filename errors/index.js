class BaseErro extends Error {
    constructor(name,message,statusCode){
        super(message)
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
    }
}

class ValidateError extends BaseErro {
    constructor(props){
        const {
            name,
            message,
            statusCode,
        } = props;

        super(
            name || 'ValidateError',
            message || ':( ocorreu um erro na validação',
            statusCode || 400
        )
    }

}

module.exports = ValidateError;