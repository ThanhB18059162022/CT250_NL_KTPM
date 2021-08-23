export class JwtService {
  jwtHelper = new JwtHelperService();

  getUserFromToken = () => {
    const token = localStorage.getItem(ApiHelper.JwkToken)?.toString();

    const data = this.jwtHelper.decodeToken(token);
    var { nameid: id, unique_name: username } = data;

    const user = new User(username, "", parseInt(id));

    return user;
  };
}
