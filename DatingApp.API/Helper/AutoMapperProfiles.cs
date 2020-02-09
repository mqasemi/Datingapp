using System;
using System.Linq;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Models;

namespace DatingApp.API.Helper
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>().ForMember(dest=>
            dest.PhotoUrl,opt=> 
                opt.MapFrom(src=>src.Photos.FirstOrDefault(photos=>photos.IsMain).Url))
                .ForMember(dest=>dest.Age,opt=>opt.MapFrom(birthdat=>birthdat.DateOfBirth.CalculateAge()));
            CreateMap<User,UserForDetailsDTO>().ForMember(dest=>
            dest.PhotoUrl,opt=> 
                opt.MapFrom(src=>src.Photos.FirstOrDefault(photos=>photos.IsMain).Url)).ForMember(dest=>dest.Age,opt=>opt.MapFrom(birthdat=>birthdat.DateOfBirth.CalculateAge()));
            CreateMap<Photo,PhotoForDetailsDto>();
        }
    }
}