//using TakeAPeek_server.Services.IServices;

//namespace TakeAPeek_server.files
//{
//    public class BackgroundWorker : BackgroundService
//    {
//        //private readonly IBackgroundTaskQueue _taskQueue;
//        private readonly IServiceScopeFactory _scopeFactory;

//        public BackgroundWorker( IServiceScopeFactory scopeFactory)//IBackgroundTaskQueue taskQueue
//        {
//            //_taskQueue = taskQueue;
//            _scopeFactory = scopeFactory;
//        }

//        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
//        {
//            while (!stoppingToken.IsCancellationRequested)
//            {
//                var workItem = await _taskQueue.DequeueAsync(stoppingToken);

//                try
//                {
//                    //await workItem(stoppingToken);
//                }
//                catch (Exception ex)
//                {
//                    Console.WriteLine($"שגיאה במשימת רקע: {ex.Message}");
//                }
//            }
//        }
//    }

//}
