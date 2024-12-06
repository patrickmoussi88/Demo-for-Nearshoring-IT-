package com.sp.somdiaa.grci.lib.dto.response;

import java.util.List;

public record DocumentFormDto(
        DocumentDto folder,

        List<DocumentFormDto> children
) {
}
