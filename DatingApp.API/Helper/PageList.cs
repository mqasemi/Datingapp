using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helper
{
    public class PageList<T> : List<T>
    {
        public int  CurrentPage { get; set; }   
        public int TotalPage { get; set; }
        public int PageSize { get; set; }   
        public int TotalCount { get; set; }
        public PageList(List<T> item,int count,int pageNumber,int pageSize)
        {
           this.TotalCount=count;
           this.PageSize =pageSize;
           this.CurrentPage=pageNumber;
           this.TotalPage=(int)Math.Ceiling(count/(double)pageSize);
           this.AddRange(item);

        }
        public static async Task<PageList<T>> CreateAsync(IQueryable<T> source, int pageNumber,int pageSize )
        {
            var count=await source.CountAsync();
            var item= await source.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync<T>();
            return new PageList<T>(item,count,pageNumber,pageSize);
        }
    }
}