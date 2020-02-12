namespace DatingApp.API.Helper
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemPerPage { get; set; }    
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public PaginationHeader(int currentPage,int itmesPerPage,int totalItems,int totalPages)
        {
            this.CurrentPage=currentPage;
            this.ItemPerPage=ItemPerPage;
            this.TotalItems=totalItems;
            this.TotalPages=totalPages;
        }
    }
}