const exec = function ({name, description, type1, type2}) {
    let errors = {}

    const nameLength = name.trim().length
    if(nameLength == 0){
        errors.name = "No puede ser vacío"
    }else if(nameLength < 4 || nameLength > 24 ){
        errors.name = "Debe tener entre 4 y 24 caracteres"
    }else if(!/^[A-Za-z]+$/.test(name)){
        errors.name = "Debe ser una palabra sin espacios"
    }
    
    if(description.length < 30){
        errors.description = "Debe tener un mínimo de 30 caracteres"
    }

    if(type1 == 0){
        errors.type1 = "Selecciona al menos un tipo"
    }

    if(type2 == type1){
        errors.type2 = "Deber ser diferente al tipo 1"
    }

    return {
        errors,
        valid: Object.keys(errors).length == 0
    }
}


const Validator = {
    exec
}

export default Validator