package board.mapper.personal;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import board.dto.personal.IntDstDto;

@Mapper
public interface PersonalMapper {
	List<IntDstDto> selectIntDstList() throws Exception;
	void insertIntDst(IntDstDto intDst) throws Exception;
	void updateIntDst(IntDstDto intDst) throws Exception;
	IntDstDto selectIntDstDetail(String intDstId) throws Exception;
	void deleteIntDst(String intDstId) throws Exception;
	
}
