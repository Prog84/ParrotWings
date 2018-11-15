using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace ParrotWings
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Добавляем поддержку CORS
            //var cors = new EnableCorsAttribute("http://localhost:4200, ", "accept,accesstoken,authorization,cache-control,pragma,content-type,origin", "GET,PUT,POST,DELETE,TRACE,HEAD,OPTIONS");
            //config.EnableCors(cors);
            //var corsAttr = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            //config.EnableCors(corsAttr);
            config.EnableCors();
            // Конфигурация и службы Web API
            // Настройка Web API для использования только проверки подлинности посредством маркера-носителя.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Маршруты Web API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

