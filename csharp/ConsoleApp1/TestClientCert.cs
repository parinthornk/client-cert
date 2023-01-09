using RestSharp;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Security;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;

namespace ConsoleApp1
{
    internal class TestClientCert
    {
        public TestClientCert()
        {
            ServicePointManager.ServerCertificateValidationCallback = (_1, _2, _3, _4) =>
            {
                return true;
            };


            var handler = new HttpClientHandler();
            handler.ClientCertificateOptions = ClientCertificateOption.Manual;
            handler.SslProtocols = SslProtocols.Tls12;
            handler.ClientCertificates.Add(new X509Certificate2(@"C:\Users\Admin\Desktop\mutual_authentication_example\ssl-client\ph-certandkey.pfx", "client"));

            var client = new HttpClient(handler);
            client.BaseAddress = new Uri("https://localhost:8888");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = client.GetAsync("/").Result;

            var statusCode = response.StatusCode;
            var contents = response.Content.ReadAsStringAsync().Result;
            Console.WriteLine("statusCode: " + statusCode);
            Console.WriteLine("contents: " + contents);
        }
    }
}