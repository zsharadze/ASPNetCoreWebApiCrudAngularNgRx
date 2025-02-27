using AutoMapper;
using ASPNetCoreWebApi.DTOs;
using ASPNetCoreWebApi.Models;

namespace ASPNetCoreWebApi.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeeDTO, Employee>().ReverseMap();
        }
    }
}
