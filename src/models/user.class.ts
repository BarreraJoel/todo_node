export class User {

    public _uuid: string;
    public _email: string;
    public _password: string;
    public _first_name: string;
    public _last_name: string;

    constructor(
        _uuid: string,
        _email: string,
        _password: string,
        _first_name: string,
        _last_name: string,
    ) {
        this._uuid = _uuid;
        this._email = _email;
        this._password = _password;
        this._first_name = _first_name;
        this._last_name = _last_name;
    }

    public get uuid() { return this._uuid; }
    public get email() { return this._email; }
    public get password() { return this._password; }
    public get first_name() { return this._first_name; }
    public get last_name() { return this._last_name; }



}