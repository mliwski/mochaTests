'use strict';

function NotFoundError(message) {
    this.name = 'NotFoundError';
    this.message = message || 'Object not found';
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = {
    NotFoundError : NotFoundError
};