const handleCatchError = (error, name = '') => {
    const { data = undefined, status = undefined } = error.response ?? {}
    if (!status) console.log(`${name} **********ERROR***********`, error)
    else console.log(`${name} **********ERROR***********`, { status, data })
}

module.exports = {
    handleCatchError
}