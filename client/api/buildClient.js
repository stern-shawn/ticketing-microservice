import axios from 'axios';

export const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      // This is necessary so that inside k8s, ingress sees a request to ticketing.dev and can apply
      // its routing rules since we're using a radically different path to hit the ingress LB...
      baseURL: 'http://www.ticketing-microservices-app.xyz/',
      // Passes along host: 'ticketing.dev' as well as our cookie header :D.
      headers: req.headers,
    });
  } else {
    return axios.create();
  }
};
