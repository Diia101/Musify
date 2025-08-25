package com.licenta.musify.domain.mapper;

import com.licenta.musify.domain.dto.UserCreateDto;
import com.licenta.musify.domain.dto.UserDto;
import com.licenta.musify.domain.dto.UserUpdateDto;
import com.licenta.musify.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", implementationPackage = "<PACKAGE_NAME>.generated", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(target = "isActive", constant = "true")
    @Mapping(target = "userType", constant = "REGULAR")
    User toEntity(UserCreateDto userCreateDto);

    @Mapping(target = "birthday", source = "birthday", dateFormat = "yyyy-MM-dd")
    UserDto toUserDto(User user);

    UserUpdateDto toUpdateViewDto(User user);
}
