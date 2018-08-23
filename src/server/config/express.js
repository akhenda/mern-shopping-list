import csrf from 'csurf';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import expressa from 'expressa';
import bodyParser from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import methodOverride from 'method-override';
import expressaSwagger from 'expressa-swagger';


export const csrfProtection = csrf({ cookie: true });

export default (app) => {
  // use method override middleware which lets us use HTTP verbs such as
  // PUT or DELETE in places where the client doesn't support it
  app.use(methodOverride());

  // use Node.js body parsing middleware
  app.use(bodyParser.urlencoded({ extended: 'true' })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

  // use morgan, HTTP request logger middleware for node.js
  app.use(morgan('dev'));

  // use Node.js compression middleware.
  app.use(compression());

  // use Helmet which helps us secure our Express apps by setting various
  // HTTP headers. It's not a silver bullet, but it can help!
  app.use(helmet());

  // use Expressa which makes it easy to create basic APIs by using
  // JSON schema:
  app.use('/api/v1', expressa.api()); // optionally pass in settings
  app.use('/admin', expressa.admin({ apiurl: '/api/v1/' }));

  // set up express-session for session creation and management
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  // use expressa-swagger. Beautifully generated documentation + restclients
  // for Express + Expressa using swagger + markdown
  expressaSwagger({
    app,
    express,
    expressa,
    url: '/api/doc',
    title: 'My appname',
    description: "Lorem ipsum 'markdown'", // or just pass  __dirname+"/API.md" e.g.
    version: '1.0.0',
    basepath: '/api',
    schemes: ['http'],
  });

  // TODO: set up serve-favicon
};
