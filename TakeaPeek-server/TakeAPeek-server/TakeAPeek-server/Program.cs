using Microsoft.OpenApi.Models;
using TakeAPeek_server.Controllers;
using TakeAPeek_server.DataAccess;
using TakeAPeek_server.Services.CServices;
using TakeAPeek_server.Services.IServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection; // Add this line
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Amazon.S3;
using DotNetEnv; // Add this line
using Amazon.Extensions.NETCore.Setup;
using Microsoft.AspNetCore.Builder;
using TakeAPeek_server.Services.CServices.TakeAPeek_server.Services;
using TakeAPeek_server.Services;


var builder = WebApplication.CreateBuilder(args);

//// טוען את הקובץ .env
Env.Load();

//// מוסיף את משתני הסביבה מהקובץ .env לקונפיגורציה
builder.Configuration.AddEnvironmentVariables();

var openAiApiKey = builder.Configuration["OPENAI_API_KEY"];

// הוספת JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// הוספת הרשאות מבוססות-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});
//sql
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer("Data Source=DESKTOP-1VUANBN; Initial Catalog=TakeAPeek; Integrated Security=True;TrustServerCertificate=True;"));


// =========== add services =========== 
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IFolderService, FolderService>();
builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<ICollageService, CollageService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<IUserRoleService,UserRoleService>();
builder.Services.AddScoped<IS3Service, S3Service>();
builder.Services.AddScoped<IAIService, AIService>();
builder.Services.AddScoped<IImageAnalysisService, ImageAnalysisService>();
builder.Services.AddScoped<IEventService, EventService>();

Console.WriteLine($"AWS Region: {builder.Configuration["AWS:Region"]}");
Console.WriteLine($"AWS Access Key ID: {builder.Configuration["AWS:AccessKeyId"]}");
Console.WriteLine($"AWS Secret Access Key: {builder.Configuration["AWS:SecretAccessKey"]}");
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();
//וידוא שהaws עובד
//var s3Client = new AmazonS3Client(awsOptions);
//try
//{
//    var buckets = await s3Client.ListBucketsAsync();
//    Console.WriteLine("Connected to AWS S3. Buckets:");
//    foreach (var bucket in buckets.Buckets)
//    {
//        Console.WriteLine($"- {bucket.BucketName}");
//    }
//}
//catch (Exception ex)
//{
//    Console.WriteLine($"Failed to connect to S3: {ex.Message}");
//}
// ========== add Swagger =============
builder.Services.AddEndpointsApiExplorer();//?
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TakeAPeek API", Version = "v1" });
    //?
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter your Bearer token",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
//

var app = builder.Build();
app.UseCors("AllowAll");

// =========== run Swagger ============
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TakeAPeek API V1");
    c.RoutePrefix = string.Empty; // זה מגדיר שה-Swagger UI יהיה ב-root של האפליקציה
});

// =========== endpoints injection ===========
FileEndpoints.MapFileEndpoints(app);
FolderEndpoints.MapFolderEndpoints(app);
TagEndpoints.MapTagEndpoints(app);
CollageEndpoints.MapCollageEndpoints(app);
AuthEndpoints.MapAuthEndpoints(app);
UserEndpoints.MapUserEndpoints(app);
AIEndpoints.MapAIEndpoints(app);
EventEndpoints.MapEventEndpoints(app);
app.Run();

